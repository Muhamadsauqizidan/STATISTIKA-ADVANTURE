from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # General Settings
    PROJECT_NAME: str = "Statistika Adventure API"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "production"

    # Supabase Settings
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    # JWT Security
    JWT_SECRET_KEY: str = "statistika-adventure-secret-key-2026-aman"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_DAYS: int = 7

    # CORS Settings (Mengizinkan localhost & semua domain Vercel)
    CORS_ORIGINS: List[str] = ["*"]

    # Pydantic Configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow",
    )


# Initialize Settings
settings = Settings()