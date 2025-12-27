package com.example.gendev8_mobile

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class WidgetViewModel : ViewModel() {
    private val _widgets = MutableStateFlow<Map<String, WidgetGroup>?>(null)
    val widgets: StateFlow<Map<String, WidgetGroup>?> = _widgets

    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users

    private val _selectedUser = MutableStateFlow<User?>(null)
    val selectedUser: StateFlow<User?> = _selectedUser

    private val _isLoading = MutableStateFlow(true)
    val isLoading: StateFlow<Boolean> = _isLoading

    var draggedWidget by mutableStateOf<WidgetInstance?>(null)
        private set

    var dropTargetWidget by mutableStateOf<WidgetInstance?>(null)
        private set

    init {
        Log.d("WidgetViewModel", "ViewModel initialized")
        loadUsers()
        loadWidgets()
        SocketManager.connect { loadWidgets() }
    }

    fun onDragStart(widget: WidgetInstance) {
        draggedWidget = widget
    }

    fun onDragEnd() {
        draggedWidget = null
        dropTargetWidget = null
    }

    fun onDragEnter(targetWidget: WidgetInstance) {
        if (draggedWidget != targetWidget) {
            dropTargetWidget = targetWidget
        }
    }

    fun onDragExit() {
        dropTargetWidget = null
    }


    fun loadWidgets() {
        viewModelScope.launch {
            _isLoading.value = true
            Log.d("WidgetViewModel", "Loading widgets...")
            println("hallo")
            try {
                val result = RetrofitInstance.api.getWidgets()
                Log.d("WidgetViewModel", "API Response: $result")
                Log.d("WidgetViewModel", "Number of categories: ${result.size}")

                val responseObj = result.filterKeys {
                    it != "categoryOrder"
                }

                _widgets.value = responseObj
                Log.d("WidgetViewModel", "Widgets successfully set")
            } catch (e: Exception) {
                Log.e("WidgetViewModel", "Error loading widgets: ${e.message}", e)
                Log.e("WidgetViewModel", "Error type: ${e.javaClass.simpleName}")
                e.printStackTrace()
                _widgets.value = null
            } finally {
                _isLoading.value = false
                Log.d("WidgetViewModel", "Loading finished, isLoading: ${_isLoading.value}")
            }
        }
    }

    fun loadUsers() {
        viewModelScope.launch {
            try {
                Log.d("WidgetViewModel", "Loading users...")
                val result = RetrofitInstance.api.getAllUsers()
                Log.d("WidgetViewModel", "API Response: $result")
                _users.value = result.allUsers
            } catch (e: Exception) {
                Log.e("WidgetViewModel", "Error loading users", e)
                _users.value = emptyList()
            }
        }
    }

    fun selectUser(user: User) {
        viewModelScope.launch {
            _selectedUser.value = user
            Log.d("WidgetViewModel", "User selected: ${user.username}")
            try {
                val requestBody = mapOf(
                    "id" to user.id,
                    "username" to user.username,
                )
                Log.d("WidgetViewModel", "Sending user data: $requestBody")

                RetrofitInstance.api.selectUser(user)
                Log.d("WidgetViewModel", "User selection successful")

                loadWidgets()
            } catch (e: Exception) {
                Log.e("WidgetViewModel", "Error selecting user: ${e.message}", e)
            }
        }
    }

    override fun onCleared() {
        super.onCleared()
        SocketManager.disconnect()
        Log.d("WidgetViewModel", "ViewModel cleared, socket disconnected")
    }
}