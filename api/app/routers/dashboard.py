from fastapi import APIRouter
from sqlmodel import select
from typing import List, Dict
from app.dataBase.db_conn import SessionDep
from app.dataBase.models import CarBooking, Customer, Cars


router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/dashboard")
def get_dashboard(
    db: SessionDep,
) -> Dict[str, int | Dict[str, List[str]] | float]:

    customers = db.exec(select(Customer)).all()
    cars = db.exec(select(Cars)).all()
    bookings = db.exec(select(CarBooking)).all()

    total_customers = len(customers)
    total_cars = len(cars)
    total_bookings = len(bookings)

    booking_dates = {
        "names": [booking.customer.Name for booking in bookings],
        "dates": [booking.BookingDate for booking in bookings],
    }

    total_revenue = sum(round(booking.TotalBillAmount, 2) for booking in bookings)

    return {
        "total_customers": total_customers,
        "total_cars": total_cars,
        "total_bookings": total_bookings,
        "booking_dates": booking_dates,
        "total_revenue": float(total_revenue),
    }
