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

## GUI

Aplikacja składa się z dwóch części:

-   widok budynku z windami (czarne bloczki w dolnej części symbolizują windy), każdy "wiersz" symbolizuje piętro, opisane numerem z lewej strony widoku budynku.
-   interfejsów symulujących panele do wyboru piętra wewnątrz windy (zakładka **Elevator Keypad**), oraz panel wywołania windy z korytarza na danym piętrze (zakładka **Hallway panel**)

### Elevator Keypad

-   `Choose elevator` - wybierz windę z listy, w której chcesz się przemieścić na inne piętro
-   `Enter target floor` - wprowadź piętro docelowe

Przycisk `Submit Call` dodaje wywołanie do kolejki wybranej windy.

### Hallway Panel

-   `Choose floor` - wybierz piętro, na którym chcesz wywołać windę
-   `Choose direction` - wybierz kierunek, w którym zamierzasz jechać

Przycisk `Submit Call` w pierwszej kolejności sprawdza, czy przypadkiem któraś z wind już nie znajduje się na danym piętrze.
Następnie szuka windy, która jedzie w tym samym kierunku.
Jeżeli takiej nie ma - najbliższą windę, oraz dodaje do wywołanie do kolejki tej windy.

Przycisk `Simulate Step` służy do przejścia pojedynczego kroku symulacji działania wind, czyli przetworzenia kolejki wezwań dla wszystkich wind.

## REST API

### GET `/step`

Wywołanie metody step() na obiekcie elevatorSystem, wykonujące krok symulacji systemu wind.

### GET `/state`

Pobranie aktualnego stanu systemu wind, zwracającego informacje o liczbie pięter i stanie każdej z wind.

### GET `/elevatorQueue`

Pobranie kolejkowania wezwań dla konkretnej windy na podstawie id. Zwracane są wartości kolejki wezwań.

### POST `/callFromElevator`

Obsługa wezwania z wnętrza windy na konkretne piętro. Przyjmuje `elevatorId` i `targetFloor` jako parametry ciała żądania.

### POST `/callFromHallway`

Obsługa wezwania z zewnątrz windy (korytarz). Przyjmuje `floor` (piętro) i `direction` (kierunek) jako parametry ciała żądania.

### Opis metod

-   `initElevators()`: Inicjalizuje windy na podstawie liczby określonej podczas tworzenia obiektu klasy.
-   `state()`: Zwraca aktualny stan systemu wind, w tym liczbę pięter i listę obiektów wind.
-   `step()`: Wykonuje jedno przejście symulacji działania wind, przetwarzając kolejkę wezwań dla każdej windy.
-   `callFromHallway(targetFloor, direction)`: Obsługuje wezwanie windy z poziomu korytarza, szukając najbliższej windy do obsługi.
-   `callFromElevator(elevatorId, targetFloor)`: Obsługuje wezwanie windy z wnętrza windy, przekierowując żądanie do odpowiedniej windy w systemie.
