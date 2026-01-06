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


class CarBookingCreate(CarBookingBase):
    CustID: int | None = None
    CarID: int | None = None


class CarBookingUpdate(SQLModel):

    Name: str | None = None
    RegNo: str | None = None
    City: str | None = None
    MobileNo: str | None = None
    Email: str | None = None
    BookingDate: str | None = None
    Discount: int | None = 0
    TotalBillAmount: float | None = None
    BookingUid: UUID | None = None
    CustID: int | None = None
    CarID: int | None = None
