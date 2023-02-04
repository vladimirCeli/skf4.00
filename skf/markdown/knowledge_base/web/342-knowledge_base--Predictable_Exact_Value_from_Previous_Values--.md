##Description:

An exact value or random number can be precisely predicted by observing previous values.



##Mitigation:


PHASE

DESCRIPTION:Increase the entropy used to seed a PRNG.

PHASE:Architecture and Design Requirements:STRATEGY:Libraries or Frameworks:
Use products or modules that conform to FIPS 140-2 [REF-267] to avoid obvious entropy problems. Consult FIPS 140-2 Annex C (Approved Random Number Generators).

PHASE:Implementation:
Use a PRNG that periodically re-seeds itself using input from high-quality sources, such as hardware devices with high entropy. However, do not re-seed too frequently, or else the entropy source might block.

