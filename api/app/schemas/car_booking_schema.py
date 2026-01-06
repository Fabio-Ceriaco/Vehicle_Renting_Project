from sqlmodel import SQLModel


class CarBookingBase(SQLModel):

    Name: str
    RegNo: str
    City: str
    MobileNo: str
    Email: str
    BookingDate: str
    Discount: int = 0
    TotalBillAmount: float
    BookingUid: str


class CarBookingResponse(CarBookingBase):

    ID: int


class CarBookingCreate(CarBookingBase):
    CustID: int | None = None
    CarID: int | None = None


class CarBookingUpdate(SQLModel):

    CustID: int | None = None
    CarID: int | None = None
    BookingDate: str | None = None
    Discount: int | None = 0
    TotalBillAmount: float | None = None
    BookingUid: str | None = None
