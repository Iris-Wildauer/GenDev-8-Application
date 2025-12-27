package com.example.gendev8_mobile


import okhttp3.RequestBody
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

interface ApiService {
    @GET("api/bff/web")
    suspend fun getWidgets(): WidgetResponse

    @GET("api/bff/user")
    suspend fun getAllUsers(): UserResponse

    @POST("api/bff/user")
    suspend fun selectUser(@Body user: UserRequest)

    @POST("api/bff/user")
    suspend fun updateWidgetOrder(@Body requestBody: WidgetOrderRequest): WidgetOrderResponse
}

object RetrofitInstance {
    private const val BASE_URL = BuildConfig.BASE_URL

    val api: ApiService by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
