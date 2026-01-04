from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from typing import List
from app.dataBase.db_conn import SessionDep
from app.dataBase.models import CarBooking
from app.schemas.car_booking_schema import (
    CarBookingUpdate,
    CarBookingCreate,
    CarBookingResponse,
)

router = APIRouter(prefix="/bookings", tags=["bookings"])


@router.get("/", response_model=List[CarBookingResponse])
def get_all_bookings(db: SessionDep):
    """Retrieve all car bookings."""
    bookings = db.exec(select(CarBooking)).all()
    if not bookings:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No bookings found"
        )
    return list(bookings)


@router.get("/{booking_id}", response_model=CarBookingResponse)
def get_booking_by_id(booking_id: int, db: SessionDep):

    booking = db.get(CarBooking, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found"
        )
    return booking


@router.post(
    "/new-booking",
    response_model=CarBookingResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_booking(booking: CarBookingCreate, db: SessionDep):

    new_booking = CarBooking.model_validate(booking)

    existing_booking = db.exec(
        select(CarBooking).where(CarBooking.ID == new_booking.ID)
    ).first()

    if existing_booking:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking with this BookingUid already exists",
        )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


@router.put("/{booking_id}", response_model=CarBookingResponse)
def update_booking(booking_id: int, booking_update: CarBookingUpdate, db: SessionDep):

    existing_booking = db.get(CarBooking, booking_id)

    if not existing_booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found"
        )
    booking_data = booking_update.model_dump(exclude_unset=True)

    for key, value in booking_data.items():
        setattr(existing_booking, key, value)
    db.add(existing_booking)
    db.commit()
    db.refresh(existing_booking)
    return existing_booking


@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: SessionDep):

    existing_booking = db.get(CarBooking, booking_id)

    if not existing_booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found"
        )
    db.delete(existing_booking)
    db.commit()
    return {"detail": "Booking deleted successfully"}
