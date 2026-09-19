# A/B testing i eksperymenty — kompendium praktyczne

## 1. Czym jest A/B test

A/B test porównuje dwie lub więcej wersji rozwiązania na losowo podzielonym ruchu.

Przykład:

```text
A — obecny przycisk
B — nowy przycisk
```

Celem jest sprawdzenie, czy zmiana wpływa na wybraną metrykę.

## 2. Hipoteza

Dobry eksperyment zaczyna się od hipotezy.

Przykład:

```text
Jeśli uprościmy formularz,
to wzrośnie odsetek jego ukończenia,
bo użytkownik będzie miał mniej pól do wypełnienia.
```

Hipoteza powinna mieć:

- zmianę,
- oczekiwany efekt,
- uzasadnienie,
- metrykę.

## 3. Primary metric

Wybierz główną metrykę przed startem testu.

Przykłady:

- conversion rate,
- completion rate,
- revenue per user,
- activation rate.

Nie wybieraj zwycięskiej metryki po zobaczeniu wyników.

## 4. Guardrail metrics

Guardrails chronią przed poprawą jednego wyniku kosztem innego.

Przykład:

```text
primary: conversion
guardrail: error rate
guardrail: page performance
```

## 5. Randomizacja

Użytkownicy powinni być przydzielani losowo.

Typowy podział:

```text
50% A
50% B
```

Przydział powinien być stabilny dla tego samego użytkownika lub jednostki eksperymentalnej.

## 6. Jednostka eksperymentu

Może to być:

- user,
- session,
- account,
- device.

Wybór zależy od produktu.

## 7. Sample size

Za mała próba zwiększa ryzyko błędnych wniosków.

Na wymaganą próbę wpływają:

- baseline,
- oczekiwany efekt,
- poziom istotności,
- moc testu,
- wariancja.

Nie kończ testu po pierwszym „ładnym” wyniku.

## 8. Minimum Detectable Effect

MDE to najmniejsza zmiana, którą test ma sensownie wykrywać.

Im mniejszy MDE, tym zwykle większa potrzebna próba.

## 9. Statistical significance

Istotność statystyczna nie oznacza automatycznie znaczenia biznesowego.

Przykład:

```text
+0.1% może być statystycznie istotne,
ale operacyjnie bez znaczenia.
```

## 10. Confidence interval

Przedział ufności pokazuje zakres niepewności estymowanego efektu.

Nie patrz wyłącznie na pojedynczy punkt.

## 11. Peeking

Ciągłe sprawdzanie wyniku i zatrzymywanie testu „gdy wygląda dobrze” może zwiększać ryzyko fałszywego wyniku.

Trzymaj się wcześniej ustalonego planu albo używaj metod zaprojektowanych do sequential testing.

## 12. Multiple comparisons

Jeśli testujesz wiele wariantów i metryk, rośnie ryzyko przypadkowego „znalezienia” efektu.

Im więcej porównań, tym ostrożniej interpretuj wynik.

## 13. Novelty effect

Nowa wersja może chwilowo działać lepiej tylko dlatego, że jest nowa.

Dłuższy test pomaga odróżnić trwały efekt od krótkiego zainteresowania.

## 14. Seasonality

Nie porównuj testu prowadzonego tylko przez nietypowy dzień lub wydarzenie.

Uwzględnij:

- dni tygodnia,
- weekend,
- sezon,
- kampanie,
- awarie.

## 15. Sample Ratio Mismatch

Jeśli planowano 50/50, a dane pokazują np. 70/30, może być problem z eksperymentem.

To ważny sygnał diagnostyczny.

## 16. A/A test

Porównuje identyczne wersje.

Przydaje się do sprawdzenia:

- randomizacji,
- pipeline'u danych,
- wariancji,
- poprawności platformy.

## 17. Feature flag

Eksperyment często jest wdrażany przez feature flag.

Przykład:

```text
new_checkout = true/false
```

Flaga powinna mieć właściciela i plan usunięcia.

## 18. Segmentacja

Po zakończeniu można analizować segmenty, ale ostrożnie.

Przykłady:

- mobile vs desktop,
- new vs returning,
- kraj,
- źródło ruchu.

Analiza segmentów po fakcie jest bardziej eksploracyjna niż potwierdzająca.

## 19. Eksperyment techniczny

Nie każdy test dotyczy wyglądu.

Można testować:

- algorytm sortowania,
- cache,
- rekomendacje,
- onboarding,
- routing,
- sposób ładowania danych.

## 20. Eksperyment a rollout

A/B test:

```text
mierzy wpływ
```

Rollout:

```text
kontroluje wdrożenie
```

Można robić rollout bez eksperymentu.

## 21. Dokument eksperymentu

Przed startem zapisz:

```text
hipoteza
warianty
primary metric
guardrails
jednostka
podział ruchu
czas / warunek zakończenia
ryzyka
```

## 22. Raport

Po teście:

- wynik,
- niepewność,
- wpływ na guardrails,
- problemy techniczne,
- decyzja,
- czego się nauczono.

## 23. Typowe błędy

- brak hipotezy,
- kilka primary metrics,
- kończenie testu za wcześnie,
- zmiana testu w trakcie,
- błędny tracking,
- nierówny podział,
- interpretowanie korelacji jako przyczyny,
- ignorowanie negatywnych guardrails.

## 24. Kiedy nie robić A/B

Nie warto, gdy:

- ruch jest bardzo mały,
- zmiana jest oczywistym bugfixem,
- ryzyko wariantu jest niedopuszczalne,
- wynik będzie zdominowany przez jednorazowe wydarzenie.

## 25. Co trzeba umieć

- sformułować hipotezę,
- wybrać primary metric,
- rozumieć sample size i MDE,
- unikać peeking,
- sprawdzać SRM,
- rozumieć guardrails,
- odróżniać eksperyment od rollout.
