from ..data import clients_data


def create_client(data):
    clients_data.create_client(data)

def get_client(sid: str):
    return clients_data.get_client(sid)

def update_client(sid: str, data):
    clients_data.update_client(sid, data)

def delete_client(sid: str):
    clients_data.delete_client(sid)
