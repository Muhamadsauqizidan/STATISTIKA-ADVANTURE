
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # General Settings
    PROJECT_NAME: str = "Statistika Adventure API"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"

    # Supabase Settings
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    # JWT Security
    JWT_SECRET_KEY: str
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_DAYS: int = 7

    # CORS Settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ]

    # Pydantic Configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow",
    )


# Initialize Settings
settings = Settings()
