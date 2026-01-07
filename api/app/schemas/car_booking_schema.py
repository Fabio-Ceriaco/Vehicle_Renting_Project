from sqlmodel import SQLModel
from uuid import UUID


class CarBookingBase(SQLModel):

    Name: str
    RegNo: str
    City: str
    MobileNo: str
    Email: str
    BookingDate: str
    Discount: int = 0
    TotalBillAmount: float


class CarBookingResponse(CarBookingBase):

    ID: int
    BookingUid: UUID


class CarBookingCreate(SQLModel):

    Email: str
    RegNo: str
    BookingDate: str
    Discount: int = 0
    TotalBillAmount: float
    CustID: int | None = None
    CarID: int | None = None


class CarBookingUpdate(SQLModel):

    Email: str | None = None
    RegNo: str | None = None
    BookingDate: str | None = None
    Discount: int | None = None
    TotalBillAmount: float | None = None
    CustID: int | None = None
    CarID: int | None = None
