##Description:

The application inserts sensitive information into debugging code, which could expose this information if the debugging code is not disabled in production.

When debugging, it may be necessary to report detailed information to the programmer. However, if the debugging code is not disabled when the application is operating in a production environment, then this sensitive information may be exposed to attackers.

##Mitigation:


PHASE:Implementation:
Do not leave debug statements that could be executed in the source code. Ensure that all debug information is eradicated before releasing the software.

PHASE:Architecture and Design:STRATEGY:Separation of Privilege:
Compartmentalize the system to have safe areas where trust boundaries can be unambiguously drawn. Do not allow sensitive data to go outside of the trust boundary and always be careful when interfacing with a compartment outside of the safe area. Ensure that appropriate compartmentalization is built into the system design and that the compartmentalization serves to allow for and further reinforce privilege separation functionality. Architects and designers should rely on the principle of least privilege to decide when it is appropriate to use and to drop system privileges.

