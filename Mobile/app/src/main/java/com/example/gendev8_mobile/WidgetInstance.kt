package com.example.gendev8_mobile
data class WidgetInstance(
    val id: String,
    val title: String,
    val picture: String?,
    val link: String?,
    val category: String,
)

data class WidgetResponse(
    val widgets: Map<String, WidgetGroup>,
    val categoryOrder: List<String>
)

data class User(
    val method: String,
    val id: String,
    val username: String,
    val widgetOrder: List<String>,
)

data class UserResponse(
    val allUsers: List<User>,
    val currentUser: User
)

data class UserRequest(
    val method: String,
    val id: String,
    val username: String,
)

data class WidgetOrderRequest(
    val method: String,
    val userId: String,
    val categoryOrder: List<String>,
)

data class WidgetOrderResponse(
    val success: Boolean,
    val error: String? = null
)