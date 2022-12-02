import sqlalchemy
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base
Base = declarative_base()



class HourlyWordFrequency(Base):

   __tablename__ = 'website_data_24'
   id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
   website = sqlalchemy.Column(sqlalchemy.String(length=100))
   words = sqlalchemy.Column(sqlalchemy.Text, nullable=True)
   # updated_at= sqlalchemy.Column(sqlalchemy.TIMESTAMP, nullable=True)
   #might need to update the text insert, could be causing test failure
   updated_at= sqlalchemy.Column(sqlalchemy.TIMESTAMP, nullable=False, server_default=sqlalchemy.text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
   hour = sqlalchemy.Column(sqlalchemy.Integer)


if __name__ == "__main__":
    from sqlalchemy import create_engine
    engine = create_engine("sqlite+pysqlite:///:memory:", echo=True, future=True)
    Base.metadata.create_all(engine)