package com.example.gendev8_mobile
data class WidgetInstance(
    val id: String,
    val title: String,
    val picture: String?,
    val link: String?,
    val category: String,
)

data class User(
    val id: String,
    val username: String,
    val widgetOrder: List<String>,
)

data class UserResponse(
    val allUsers: List<User>,
    val currentUser: User
)