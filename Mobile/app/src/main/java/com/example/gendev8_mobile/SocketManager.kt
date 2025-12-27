package com.example.gendev8_mobile

import android.content.ContentValues.TAG
import android.util.Log
import io.socket.client.IO
import io.socket.client.Socket
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import java.net.URISyntaxException

    object SocketManager {
        private var socket: Socket? = null
        private val _isConnected = MutableStateFlow(false)
        val isConnected: StateFlow<Boolean> = _isConnected

        private var onUserChangeCallback: (() -> Unit)? = null
        private val _messages = MutableStateFlow<List<String>>(emptyList())
        val messages: StateFlow<List<String>> = _messages

        fun setUserChangeCallback(callback: () -> Unit) {
            onUserChangeCallback = callback
        }

        fun connect(onWidgetChange: (() -> Unit)?) {
            if (socket?.isActive == true) {
                return
            }

            try {
                socket = IO.socket(BuildConfig.BASE_URL)
            } catch (e: URISyntaxException) {
                Log.e(TAG, "URISyntaxException: ${e.reason}")
                return
            }

            socket?.on(Socket.EVENT_CONNECT) {
                _isConnected.value = true
                Log.d(TAG, "Socket connected!")
            }

            socket?.on(Socket.EVENT_DISCONNECT) {
                _isConnected.value = false
                Log.d(TAG, "Socket disconnected!")
            }

            socket?.on(Socket.EVENT_CONNECT_ERROR) { args ->
                Log.e(TAG, "Connection Error: ${args.joinToString { it.toString() }}")
            }

            socket?.on("server-message") { args ->
                if (args.isNotEmpty() && args[0] is String) {
                    val message = args[0] as String
                    _messages.value = _messages.value + message
                    Log.d(TAG, "Received message: $message")
                }
            }

            socket?.on("user-change") {
                onUserChangeCallback?.invoke()
                Log.d(TAG, "Received user-change event")
            }

            socket?.connect()
        }
        fun disconnect() {
            socket?.disconnect()
            socket = null
            onUserChangeCallback = null
        }
}
