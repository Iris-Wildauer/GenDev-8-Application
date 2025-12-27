package com.example.gendev8_mobile


import androidx.compose.foundation.ExperimentalFoundationApi
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
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DragHandle
import androidx.compose.ui.Alignment
import androidx.compose.ui.text.font.FontWeight
import androidx.lifecycle.viewmodel.compose.viewModel
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import sh.calvin.reorderable.ReorderableItem
import sh.calvin.reorderable.rememberReorderableLazyListState

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun WidgetScreen(
    widgets: Map<String, WidgetGroup>?,
    isLoading: Boolean,
    currentUser: User? = null,
    allUsers: List<User> = emptyList(),
    onWidgetClick: (WidgetInstance) -> Unit,
    onOrderChanged: (List<String>) -> Unit,
) {
    var sendJob by remember { mutableStateOf<Job?>(null) }
    val coroutineScope = rememberCoroutineScope()
    println("Frontend" + widgets)
    val userWithOrder = allUsers.find { it.id == currentUser?.id } ?: currentUser
    println("User with order: ${userWithOrder?.widgetOrder}")
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
            val lazyListState = rememberLazyListState()
            var widgetsList by remember { mutableStateOf(sortWidgetsByUserOrder(widgets, userWithOrder)) }

            LaunchedEffect(widgets, userWithOrder?.widgetOrder) {
                widgetsList = sortWidgetsByUserOrder(widgets, userWithOrder)
            }
            val reorderableLazyListState = rememberReorderableLazyListState(lazyListState) { from, to ->
                widgetsList = widgetsList.toMutableList().apply {
                    add(to.index, removeAt(from.index))
                }
                sendJob?.cancel()
                sendJob = coroutineScope.launch {
                    delay(500)
                    val newOrder = widgetsList.map { it.first }
                    println("Drag finished - Sending order: $newOrder")
                    onOrderChanged(newOrder)
                }
            }

            LazyColumn(
                state = lazyListState,
                contentPadding = PaddingValues(vertical = 16.dp),
                verticalArrangement = Arrangement.spacedBy(24.dp),
            ) {
                items(
                    count = widgetsList.size,
                    key = { index ->
                        val (category, group) = widgetsList[index]
                        "${group.design}-$category"
                    }
                ) { index ->
                    val (category, group) = widgetsList[index]

                    if (group.widgets.isNotEmpty()) {
                        ReorderableItem(
                            reorderableLazyListState,
                            key = "${group.design}-$category"
                        ) { isDragging ->
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .background(
                                        if (isDragging) Color(0xFFf1f5f9) else Color.Transparent
                                    )
                            ) {
                                Row(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(horizontal = 16.dp, vertical = 8.dp),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = category,
                                        style = MaterialTheme.typography.titleLarge,
                                        color = Color(0xFF1e293b),
                                        fontWeight = FontWeight.Bold
                                    )

                                    Icon(
                                        imageVector = Icons.Default.DragHandle,
                                        contentDescription = "Reorder",
                                        modifier = Modifier
                                            .draggableHandle()
                                            .padding(8.dp),
                                        tint = Color(0xFF64748b)
                                    )
                                }

                                LazyRow(
                                    contentPadding = PaddingValues(horizontal = 16.dp),
                                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                                ) {
                                    items(group.widgets, key = { it.id }) { widget ->
                                        if (group.design == "style1") {
                                            WidgetCard(
                                                widget = widget,
                                                onClick = { onWidgetClick(widget) }
                                            )
                                        } else if (group.design == "style2") {
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

fun sortWidgetsByUserOrder(
    widgets: Map<String, WidgetGroup>,
    currentUser: User?
): List<Pair<String, WidgetGroup>> {
    val order = currentUser?.widgetOrder

    return when {
        !order.isNullOrEmpty() -> {
            val widgetsByCategory = widgets.toMap()

            order.mapNotNull { category ->
                widgetsByCategory[category]?.let { group ->
                    category to group
                }
            }
        }
        else -> widgets.toList()
    }

}
