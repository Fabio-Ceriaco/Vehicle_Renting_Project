from sqlmodel import SQLModel, Field


class CarBase(SQLModel):

    Brand: str
    Model: str
    Year: int
    Color: str
    Daily_Rate: float
    CarImage: str | None = None
    RegNo: str


class CarResponse(CarBase):

    ID: int = Field(default=None, primary_key=True)


class CarCreate(CarBase):
    pass


class CarUpdate(SQLModel):

    Brand: str | None = None
    Model: str | None = None
    Year: int | None = None
    Color: str | None = None
    Daily_Rate: float | None = None
    CarImage: str | None = None
    RegNo: str | None = None
