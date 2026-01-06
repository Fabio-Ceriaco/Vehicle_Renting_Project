from sqlmodel import SQLModel, Field, Relationship


class CarBooking(SQLModel, table=True):

    ID: int = Field(
        default=None,
        primary_key=True,
        sa_column_kwargs={"autoincrement": True},
        nullable=False,
    )
    CustID: int = Field(foreign_key="customer.ID", nullable=False)
    CarID: int = Field(foreign_key="cars.ID", nullable=False)
    BookingDate: str = Field(nullable=False)
    Discount: int = Field(default=0, nullable=False)
    TotalBillAmount: float = Field(nullable=False)
    BookingUid: str = Field(nullable=False, unique=True)

    customer: Customer = Relationship(back_populates="bookings")
    car: Cars = Relationship(back_populates="bookings")


class Cars(SQLModel, table=True):

    ID: int = Field(
        default=None,
        primary_key=True,
        sa_column_kwargs={"autoincrement": True},
        nullable=False,
    )
    Brand: str = Field(nullable=False)
    Model: str = Field(nullable=False)
    Year: int = Field(nullable=False)
    Color: str = Field(nullable=False)
    Daily_Rate: float = Field(nullable=False)
    CarImage: str = Field(nullable=True)
    RegNo: str = Field(nullable=False, unique=True)

    bookings: CarBooking = Relationship(back_populates="car")


class Customer(SQLModel, table=True):

    ID: int = Field(
        default=None,
        primary_key=True,
        sa_column_kwargs={"autoincrement": True},
        nullable=False,
    )
    Name: str = Field(nullable=False)
    City: str = Field(nullable=False)
    MobileNo: str = Field(nullable=False, unique=True)
    Email: str = Field(nullable=False, unique=True)

    bookings: CarBooking = Relationship(back_populates="customer")
