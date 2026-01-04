from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from typing import List
from app.dataBase.db_conn import SessionDep
from app.dataBase.models import Customer
from app.schemas.customer_schema import (
    CustomerCreate,
    CustomerResponse,
    CustomerUpdate,
)


router = APIRouter(prefix="/customers", tags=["customers"])


@router.get("/", response_model=List[CustomerResponse])
def get_all_customers(db: SessionDep):

    customers = db.exec(select(Customer)).all()
    if not customers:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No customers found"
        )
    return list(customers)


@router.get("/{customer_id}", response_model=CustomerResponse)
def get_customer_by_id(customer_id: int, db: SessionDep):

    customer = db.get(Customer, customer_id)

    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found"
        )
    return customer


@router.post("/new-customer", response_model=CustomerResponse)
def create_new_customer(customer: CustomerCreate, db: SessionDep):

    new_customer = Customer.model_validate(customer)

    existing_customer = db.get(Customer, new_customer.ID)

    if existing_customer:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Customer with this ID already exists",
        )
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer


@router.put("/{customer_id}", response_model=CustomerResponse)
def update_customer(customer_id: int, customer_update: CustomerUpdate, db: SessionDep):

    existing_customer = db.get(Customer, customer_id)

    if not existing_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found"
        )
    customer_data = customer_update.model_dump(exclude_unset=True)
    for key, value in customer_data.items():
        setattr(existing_customer, key, value)
    db.add(existing_customer)
    db.commit()
    db.refresh(existing_customer)
    return existing_customer


@router.delete("/{customer_id}")
def delete_customer(customer_id: int, db: SessionDep):

    existing_customer = db.get(Customer, customer_id)

    if not existing_customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found"
        )
    db.delete(existing_customer)
    db.commit()
    return {"detail": "Customer deleted successfully"}
