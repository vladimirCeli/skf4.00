##Description:

A product incorrectly assigns a privilege to a particular actor, creating an unintended sphere of control for that actor.



##Mitigation:


PHASE:Architecture and Design Operation:
Very carefully manage the setting, management, and handling of privileges. Explicitly manage trust zones in the software.

PHASE:Architecture and Design Operation:STRATEGY:Environment Hardening:
Run your code using the lowest privileges that are required to accomplish the necessary tasks [REF-76]. If possible, create isolated accounts with limited privileges that are only used for a single task. That way, a successful attack will not immediately give the attacker access to the rest of the software or its environment. For example, database applications rarely need to run as the database administrator, especially in day-to-day operations.

