package com.example.gendev8_mobile

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowDropDown
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun TopBar(
    selectedUser: User?,
    users: List<User>,
    onUserSelect: (User) -> Unit
) {
    var expanded by remember { mutableStateOf(false) }

    Column(modifier = Modifier.fillMaxWidth()) {
        Surface(
            modifier = Modifier.fillMaxWidth(),
            color = Color(0xFF0046B3)
        ) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp, vertical = 15.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = buildAnnotatedString {
                        withStyle(
                            style = SpanStyle(
                                fontWeight = FontWeight.Bold,
                                color = Color.White,
                                fontSize = 20.sp
                            )
                        ) {
                            append("CHECK24")
                        }
                        append(" ")
                        withStyle(
                            style = SpanStyle(
                                fontWeight = FontWeight.ExtraLight,
                                color = Color.White,
                                fontSize = 15.sp
                            )
                        ) {
                            append("GenDev")
                        }
                    },
                    style = MaterialTheme.typography.titleLarge
                )


                Box {
                    Surface(
                        onClick = { expanded = true },
                        shape = RoundedCornerShape(8.dp),
                        color = Color(0xFFF5F5F5)
                    ) {
                        Row(
                            modifier = Modifier.padding(
                                horizontal = 16.dp,
                                vertical = 10.dp
                            ),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(4.dp)
                        ) {
                            Text(
                                text = selectedUser?.username ?: "select User",
                                style = MaterialTheme.typography.bodyMedium,
                                color = Color.Black,
                                fontWeight = FontWeight.Medium
                            )
                            Icon(
                                imageVector = Icons.Default.ArrowDropDown,
                                contentDescription = "Dropdown",
                                tint = Color.Black
                            )
                        }
                    }

                    DropdownMenu(
                        expanded = expanded,
                        onDismissRequest = { expanded = false }
                    ) {
                        users.forEach { user ->
                            DropdownMenuItem(
                                text = {
                                    Text(
                                        user.username,
                                        fontWeight = if (user == selectedUser)
                                            FontWeight.Bold else FontWeight.Normal
                                    )
                                },
                                onClick = {
                                    onUserSelect(user)
                                    expanded = false
                                }
                            )
                        }
                    }
                }
            }
        }

        Text(
            text = "Deine Widgets",
            style = MaterialTheme.typography.headlineSmall,
            fontWeight = FontWeight.SemiBold,
            color = Color.Black,
            fontSize = 22.sp,
            modifier = Modifier.padding(horizontal = 16.dp, vertical = 16.dp)
        )
    }
}

