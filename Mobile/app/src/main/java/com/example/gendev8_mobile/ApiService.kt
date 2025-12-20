package com.example.gendev8_mobile


import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

interface ApiService {
    @GET("api/bff/web")
    suspend fun getWidgets(): Map<String, WidgetGroup>

    @GET("api/bff/user")
    suspend fun getAllUsers(): UserResponse

    @POST("api/bff/user")
    suspend fun selectUser(@Body user: User)
}

object RetrofitInstance {
    private const val BASE_URL = "http://10.0.2.2:3000/"

    val api: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
