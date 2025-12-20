package com.example.gendev8_mobile


data class WidgetGroup(
    val widgets: List<WidgetInstance>,
    val priority: Int,
    val design: String?
)
