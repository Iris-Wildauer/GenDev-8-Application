package com.example.gendev8_mobile


import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.ui.Alignment
import androidx.compose.ui.text.font.FontWeight

@Composable
fun WidgetScreen(
    widgets: Map<String, WidgetGroup>?,
    isLoading: Boolean,
    onWidgetClick: (WidgetInstance) -> Unit
) {
    when {
        isLoading -> {
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(24.dp)
            ) {
                items(2) {
                    Column {
                        Box(
                            modifier = Modifier
                                .height(20.dp)
                                .width(100.dp)
                                .background(Color(0xFFe2e8f0))
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                        LazyRow(
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            items(3) {
                                SkeletonCard()
                            }
                        }
                    }
                }
            }
        }

        widgets != null && widgets.isNotEmpty() -> {
            LazyColumn(
                contentPadding = PaddingValues(vertical = 16.dp),
                verticalArrangement = Arrangement.spacedBy(24.dp)
            ) {
                widgets.forEach { (category, group) ->
                    if (group.widgets.isNotEmpty()) {
                        if (group.design == "style1") {
                            item {
                                Column {
                                    Text(
                                        text = category,
                                        style = MaterialTheme.typography.titleLarge,
                                        modifier = Modifier.padding(
                                            horizontal = 16.dp,
                                            vertical = 8.dp
                                        ),
                                        color = Color(0xFF1e293b),
                                        fontWeight = FontWeight.Bold
                                    )

                                    LazyRow(
                                        contentPadding = PaddingValues(horizontal = 16.dp),
                                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                                    ) {
                                        items(group.widgets) { widget ->
                                            WidgetCard(
                                                widget = widget,
                                                onClick = { onWidgetClick(widget) }
                                            )
                                        }
                                    }
                                }
                            }
                        } else if (group.design == "style2") {
                            item(key = "style2-$category") {
                                Column(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                ) {
                                    Text(
                                        text = category,
                                        style = MaterialTheme.typography.titleLarge,
                                        modifier = Modifier.padding(horizontal = 16.dp, vertical = 8.dp),
                                        color = Color(0xFF1e293b),
                                        fontWeight = FontWeight.Bold
                                    )
                                    LazyRow(
                                        contentPadding = PaddingValues(horizontal = 16.dp),
                                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                                        ) {
                                            items(group.widgets, key = { it.id }) { widget ->
                                                WidgetCard2(
                                                    widget = widget,
                                                    onClick = { onWidgetClick(widget) }
                                                )
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        else -> {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                Text("Keine Widgets verfügbar")
            }
        }
    }
}

@Composable
fun SkeletonCard() {
    Card(
        modifier = Modifier
            .width(280.dp)
            .height(240.dp),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(160.dp)
                    .background(Color(0xFFe2e8f0))
            )
            Column(modifier = Modifier.padding(12.dp)) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.7f)
                        .height(18.dp)
                        .background(Color(0xFFe2e8f0))
                )
                Spacer(modifier = Modifier.height(8.dp))
                Box(
                    modifier = Modifier
                        .fillMaxWidth(0.5f)
                        .height(14.dp)
                        .background(Color(0xFFe2e8f0))
                )
            }
        }
    }
}
