package com.example.gendev8_mobile

// MainActivity.kt
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.core.net.toUri

class MainActivity : ComponentActivity() {
    private val viewModel: WidgetViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MaterialTheme {
                val widgets by viewModel.widgets.collectAsState()
                val users by viewModel.users.collectAsState()
                val selectedUser by viewModel.selectedUser.collectAsState()
                val isLoading by viewModel.isLoading.collectAsState()

                Scaffold(
                    topBar = {
                        TopBar(
                            selectedUser = selectedUser,
                            users = users,
                            onUserSelect = { viewModel.selectUser(it) }
                        )
                    }
                ) { padding ->
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(padding)
                    ) {
                        Text(
                            text = "CHECK24 GenDev",
                            style = MaterialTheme.typography.headlineMedium,
                            modifier = Modifier.padding(16.dp)
                        )

                        WidgetScreen(
                            widgets = widgets,
                            isLoading = isLoading,
                            onWidgetClick = { widget ->
                                widget.link?.let { link ->
                                    val intent = Intent(Intent.ACTION_VIEW, link.toUri())
                                    startActivity(intent)
                                }
                            }
                        )
                    }
                }
            }
        }
    }
}
