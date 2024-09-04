## Solution Overview

### Design Patterns

### **Architecture**
([https://github.com/bilalzaraket/template-ts/blob/master/UML%20rep.svg](/UML%20rep.png)


1. **State Pattern**

   - The State pattern is utilized to manage the different modes of the clock. This pattern helps in encapsulating the varying behavior associated with the different states (edit modes) of the clock. Specifically, we have implemented the State pattern to handle the various editing states of the clock such as editing hours and minutes. The `EditState` interface defines the common behavior for all states, while specific states like `NoneEditState`, `HoursEditState`, and `MinutesEditState` implement the behavior for each particular mode.

2. **Observer Pattern**

   - The Observer pattern is used for synchronization between the clock model and its views. This pattern ensures that any changes in the time (from the `TimeSubject`) are automatically and consistently reflected across all views. The `TimeSubject` maintains a list of observers (such as `WatchController`), and notifies them of any updates (such as a change in seconds). This allows for real-time updates across all clock instances.

3. **Factory Pattern**
   - The Factory pattern is employed for creating clock instances. The `ClockFactory` class is responsible for generating instances of `WatchController` along with either a `DigitalWatchView` or an `AnalogWatchView`. This pattern simplifies the process of creating objects and ensures that the appropriate type of clock is created based on the input parameters.

### Types of Clocks

- **Digital Clocks**: These clocks display the time in a digital format. They have features such as changing time zones, toggling 12/24-hour formats, and various buttons for interaction (e.g., mode, increase, light, AM/PM, reset).
- **Analog Clocks**: These clocks display the time using traditional clock hands. They show the time through rotating hands (hour, minute, and second) on a clock face.

### Service Layer

- **WatchService**: A service layer is present in the architecture to handle interactions between the controller and the model. This layer is responsible for managing communication and logic related to clock operations. However, for simplicity and clarity in this exercise, the service layer could be considered an optional component. The core functionality is directly handled by the controller and view classes.

### Conclusion

This architecture provides a modular and flexible approach to building and managing clocks with varying functionalities. By leveraging these design patterns, the solution ensures clear separation of concerns, ease of maintenance, and extensibility.
