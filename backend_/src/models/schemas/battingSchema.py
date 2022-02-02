from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class BattingSchema(BaseModel):
    user_id:int
    shotType:str
    accuracy:str
   
    class Config:
        orm_mode = True


class BattingSaveInfo(BattingSchema):
    user_id:int
    shotType:str
    accuracy:str

class GetBattingInfo(BattingSchema):
    date:datetime

