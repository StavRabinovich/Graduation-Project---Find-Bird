from enum import Enum, auto


class USER_TYPE(Enum):
    USER = 0
    BIRD_WATCHER = 1
    ADMIN = 2
    
    @classmethod
    def contains(cls, type):
        return type in [v.value for v in cls.__members__.values()]

