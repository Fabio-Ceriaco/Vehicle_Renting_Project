from typing import Annotated
from sqlmodel import Session, create_engine, SQLModel
from fastapi import Depends

mysql_database_url = "mysql+mysqlconnector://root@localhost:3306/Rental_db"

engine = create_engine(mysql_database_url, echo=True)


def get_session():
    with Session(engine) as session:
        yield session


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


SessionDep = Annotated[Session, Depends(get_session)]
