[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/Araara7/news-image-20261124-v2/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/Araara7/news-image-20261124-v2/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

An entry for the [news-image-20261124 bounty on make.fun](https://make.fun/bounty/news-image-20261124).

# The War Sails South

A single-image newspaper front page summing up the world news of
Tuesday 24 November 2026.

## The image

The front page is headlined **"The War Sails South"**. Its lead story is
Ukraine's sinking of the Russian corvette *Merkury* in Benghazi harbour,
Libya, struck by sea drones — an attack President Zelenskyy claimed
responsibility for on Monday 23 November. The cargo ship MV *Angara* was
hit in the same operation, a sign of how far from the Black Sea this war
has now travelled.

Around the lead, a grid of four stories fills out the day:

- **Nvidia reinstates Jensen Huang as chief executive**, after a board
  standoff over the company's direction.
- **COP31 climate talks collapse in Antalya**, with negotiators leaving
  without a deal.
- **The UN counts 25 seafarers killed around the Strait of Hormuz**,
  as shipping through the Gulf stays under threat.
- **Moscow warns Estonia of "open war"**, sharpening tensions on
  NATO's eastern flank.

A strip along the foot of the page carries three lighter items: India
pledges $1.6 billion to Nepal after devastating floods; Max Verstappen
wins the Las Vegas Grand Prix; and a rescue unfolds after a factory
fire in Banten, Indonesia.

## What the program does

`main.ts` (Node 22, standard library only) reads `entry.png` from beside
itself, checks that it is a genuine PNG no larger than 1 MiB and no
bigger than 1024×1024, then copies it unchanged into the output
directory. The copy is deterministic: the same input always produces
the same output bytes, with no network access, no randomness, and no
use of the date.

## Run it locally

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.png`, byte-identical to the `entry.png` in this
repository.
