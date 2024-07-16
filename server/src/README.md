# System obsługi wind

_Testowano na NodeJS v16.15.1_

## Uruchamianie aplikacji NodeJS

Aby uruchomić aplikację w trybie deweloperskim:

1. Przejść do folderu _server_ `cd server`
2. Pobrać zależności: `npm i`
3. Uruchomić aplikację: `npm run dev`

Aplikacja jest wtedy dynamicznie odświeżana przez _nodemon_ w przypadku zmian.

## Uruchamianie aplikacji Angular

Aby uruchomić aplikację należy:

1. Przejść do folderu _server_ `cd app`
2. Pobrać zależności: `npm i`
3. Uruchomić aplikację: `ng serve`

Aplikacja frontendowa powinna być dostępna pod adresem
`http://localhost:5200`

## Konfiguracja

Istnieje możliwość konfiguracji parametrów inicjalizacyjnych aplikacji NodeJS.
Zmienne środowiskowe znajdują się w pliku **.env** w katalogu głównym.

Dostępne zmienne:

-   `PORT = 3000` - port na którym wystawiany jest serwer
-   `ELEVATORS_COUNT = 10` - liczba wind
-   `FLOORS = 12` - liczba pięter

## REST API

### Usługi POST

#### `/callFromElevator` - polecenie z wewnątrz windy

**Body:**

-   _elevatorId_ - ID windy z której wysyłane jest wywołanie
-   _targetFloor_ - docelowe piętro, na które winda ma jechać

#### `/callFromHallway` - polecenie z korytarza

**Body:**

-   _floor_ - piętro na którym znajduje się panel wywołań
-   _direction_ - kierunek, w którym chcemy jechać

### Usługi GET

#### `/step` - krok symulacji, przemieszczenie windy/wind

#### `/state` - status systemu
