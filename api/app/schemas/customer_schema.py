from sqlmodel import SQLModel, Field
from pydantic import EmailStr


class CustomerBase(SQLModel):

    Name: str
    City: str
    MobileNo: str = Field(regex=r"^\+?[1-9]\d{1,14}$")
    Email: EmailStr


class CustomerResponse(CustomerBase):

    ID: int = Field(default=None, primary_key=True)


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(SQLModel):

    Name: str | None = None
    City: str | None = None
    MobileNo: str | None = None
    Email: EmailStr | None = None
