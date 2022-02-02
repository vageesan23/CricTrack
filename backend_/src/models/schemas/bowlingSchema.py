from typing import List, Optional

from pydantic import BaseModel



class Bowling(BaseModel):
    user_id:int
    wicketTakingPercentage:str
    suggestion:str
    speed:str

    class Config:
        orm_mode = True


class BowlingCreate(Bowling):
    user_id:int
    wicketTakingPercentage:str
    suggestion:str
    speed:str



