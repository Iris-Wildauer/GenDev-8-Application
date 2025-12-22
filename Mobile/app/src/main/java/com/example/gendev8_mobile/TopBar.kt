package com.example.gendev8_mobile

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.graphics.Color


@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TopBar(
    selectedUser: User?,
    users: List<User>,
    onUserSelect: (User) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    TopAppBar(
        title = {
            Text(
                text = "GENDEV 8 – HOME WIDGETS",
                style = MaterialTheme.typography.titleLarge,
            )
        },
        actions = {
            Box {
                TextButton(onClick = { expanded = true }) {
                    Text(
                        selectedUser?.username ?: "Select User",
                        color = Color.Black
                    )
                    Text(
                        " ▾",
                        color = Color.Black
                    )
                }

                DropdownMenu(
                    expanded = expanded,
                    onDismissRequest = { expanded = false }
                ) {
                    users.forEach { user ->
                        DropdownMenuItem(
                            text = { Text(user.username) },
                            onClick = {
                                onUserSelect(user)
                                expanded = false
                            }
                        )
                    }
                }
            }
        },
        colors = TopAppBarDefaults.topAppBarColors(
            containerColor = Color(0xFF0046B3),
            titleContentColor = Color.White,
            actionIconContentColor = Color.White
        )
    )
}
