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

    private val _categoryOrder = MutableStateFlow<List<String>>(emptyList())
    val categoryOrder: StateFlow<List<String>> = _categoryOrder

    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users

    private val _selectedUser = MutableStateFlow<User?>(null)
    val selectedUser: StateFlow<User?> = _selectedUser

    private val _isLoading = MutableStateFlow(true)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _currentUser = MutableStateFlow<User?>(null)
    val currentUser: StateFlow<User?> = _currentUser


    init {
        Log.d("WidgetViewModel", "ViewModel initialized")
        loadUsers()
        loadWidgets()
        SocketManager.setWidgetChangeCallback { loadWidgets() }
        SocketManager.setUserChangeCallback { onUserChange() }
        SocketManager.connect { loadWidgets() }
    }

    fun loadWidgets() {
        viewModelScope.launch {
            _isLoading.value = true
            Log.d("WidgetViewModel", "Loading widgets...")
            try {
                val result = RetrofitInstance.api.getWidgets()
                _widgets.value = result.widgets
                _categoryOrder.value = result.categoryOrder

                Log.d("WidgetViewModel", "Widgets: ${result.widgets.keys}")
                Log.d("WidgetViewModel", "Order: ${result.categoryOrder}")

                val responseObj = _widgets.value?.filterKeys {
                    it != "categoryOrder"
                }

                val widgetsMap = _widgets.value?.filterKeys { it != "categoryOrder" }
                    ?.mapValues { (_, value) ->
                        value
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
                val result = RetrofitInstance.api.getAllUsers()
                Log.d("WidgetViewModel", "API Response: $result")
                _selectedUser.value = result.currentUser
                _users.value = result.allUsers
                _currentUser.value = result.currentUser
                Log.d("WidgetViewModel", result.currentUser.toString())
                Log.d("WidgetViewModel", "Users: ${result.allUsers.map { it.username }}")
            } catch (e: Exception) {
                Log.e("WidgetViewModel", "Error loading users", e)
                _users.value = emptyList()
            }
        }
    }

    fun selectUser(user: User) {
        viewModelScope.launch {
            _selectedUser.value = user
            _currentUser.value = user
            Log.d("WidgetViewModel", "User selected: ${user.username}")
            try {
                val requestBody = UserRequest(
                    method = "setUser",
                    id = user.id,
                    username = user.username,
                )
                Log.d("WidgetViewModel", "Sending user data: $requestBody")

                RetrofitInstance.api.selectUser(requestBody)
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

    private fun onUserChange() {
        Log.d("WidgetViewModel", "User change detected, reloading data...")
        viewModelScope.launch {
            loadUsers()
            loadWidgets()
        }
    }

}
