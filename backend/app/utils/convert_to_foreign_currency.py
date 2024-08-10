import requests


def convert_to_foreign_currency(value_pesos: float, currency: str = "dol", type_of_currency: str = "oficial"):
    if currency == "dol":
        response = requests.get(f"https://dolarapi.com/v1/dolares/{type_of_currency}")
    else:
        response = requests.get(f"https://dolarapi.com/v1/cotizaciones/{currency}")
    if response.status_code == 200:
        currency_venta = response.json().get("venta", 0.0)
        return value_pesos / currency_venta
    else:
        raise Exception(f"Error en llamada a API de cotizaciones. Status_code: {response.status_code}, Reason: {response.reason}, text: {response.text}")
