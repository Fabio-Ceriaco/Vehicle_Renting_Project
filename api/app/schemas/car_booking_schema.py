from sqlmodel import SQLModel, Field


class CarBookingBase(SQLModel):

    CustID: int
    CarID: int
    BookingDate: str
    Discount: int = 0
    TotalBillAmount: float


class CarBookingResponse(CarBookingBase):

    BookingID: int = Field(default=None, primary_key=True)


class CarBookingCreate(CarBookingBase):
    pass


class CarBookingUpdate(SQLModel):

    CustID: int | None = None
    CarID: int | None = None
    BookingDate: str | None = None
    Discount: int | None = 0
    TotalBillAmount: float | None = None
