from fastapi import APIRouter, HTTPException, status
from sqlmodel import select
from typing import List
from app.dataBase.db_conn import SessionDep
from app.dataBase.models import Cars
from app.schemas.car_schema import CarCreate, CarResponse, CarUpdate

router = APIRouter(prefix="/cars", tags=["cars"])


@router.get("/", response_model=List[CarResponse])
def get_all_cars(db: SessionDep):

    cars = db.exec(select(Cars)).all()
    if not cars:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No cars found"
        )
    return list(cars)


@router.get("/{car_id}", response_model=CarResponse)
def get_car_by_id(car_id: int, db: SessionDep):

    car = db.get(Cars, car_id)

    if not car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Car not found"
        )
    return car


@router.post(
    "/new-car", response_model=CarResponse, status_code=status.HTTP_201_CREATED
)
def create_new_car(car: CarCreate, db: SessionDep):

    new_car = Cars.model_validate(car)  # Convert CarCreate to Cars model instance

    existing_car = db.get(Cars, new_car.ID)

    if existing_car:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Car with this ID already exists",
        )
    db.add(new_car)
    db.commit()
    db.refresh(new_car)
    return new_car


@router.put("/{car_id}", response_model=CarResponse)
def update_car(car_id: int, car_update: CarUpdate, db: SessionDep):

    existing_car = db.get(Cars, car_id)

    if not existing_car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Car not found"
        )

    car_data = car_update.model_dump(
        exclude_unset=True
    )  # Get only provided fields to update

    for key, value in car_data.items():
        setattr(existing_car, key, value)
    db.add(existing_car)
    db.commit()
    db.refresh(existing_car)
    return existing_car


@router.delete("/{car_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_car(car_id: int, db: SessionDep):

    existing_car = db.get(Cars, car_id)

    if not existing_car:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Car not found"
        )
    db.delete(existing_car)
    db.commit()
    return {"detail": "Car deleted successfully"}
