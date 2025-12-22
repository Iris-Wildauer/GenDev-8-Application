package com.example.gendev8_mobile

import com.google.gson.annotations.SerializedName

enum class WidgetCategory(val displayName: String) {
    @SerializedName("Internet")
    INTERNET("Internet"),

    @SerializedName("Insurance")
    INSURANCE("Versicherung");

    companion object {
        fun fromString(value: String): WidgetCategory? {
            return entries.find {
                it.name.equals(value, ignoreCase = true) ||
                        it.displayName.equals(value, ignoreCase = true)
            }
        }
    }
}