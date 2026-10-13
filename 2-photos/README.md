# Thread 2 · Photos — from source photo to finished image

The workflow that turns a piece into its photographs: intake, capture, AI editing and export. This thread also holds the rules on what may be retouched and whose images we may use.

**Owns:** this folder:
- [13 Photography & AI pipeline](13-photography-pipeline.md)
- [20 Borrowed imagery](20-imagery-rights.md)
- [prompts](prompts.md) (prompts for generated backdrops)

**Read first:**
- the photography spec in [08 Brand](../brand/08-brand.md)
- D6, D10 and D20 in [DECISIONS](../0-plan/DECISIONS.md)

---

## The rules this workflow has to keep

Already decided ([D10](../0-plan/DECISIONS.md), [D20](../0-plan/DECISIONS.md)):

| Frame | What it is | AI | Grain | Label |
|---|---|---|---|---|
| **1 · Composed** | The piece on the paper ground, in north-window morning light | Yes | Yes | — |
| **2 · Maker's mark** | A macro of the signature, about 1:1 | **No** | **No** | *Unretouched* |
| **3 · On-body** | Scale: a real model, or an AI model labelled as one | Yes | Yes | *Shown on a digital model for scale* + the size in mm |
| **4 · Condition** | Every flaw, shown plainly | **No** | **No** | *Unretouched* |

- **AI never removes or softens** plating loss, scratches, chips, missing or replaced stones, repairs or patina. It never changes the colour of metal or stones.
- **Generated backdrops are allowed; generated pieces are not.** The background may be synthetic. The object is always a photograph of the real item ([20](20-imagery-rights.md)). Never place a piece onto a painting or photograph someone else made.
- **A label doesn't make a misleading image acceptable** (CAP guidance, [13](13-photography-pipeline.md)).

## On using auction-house and shop photos

These sources are useful for buying and record-keeping. They cannot become the published image, whether edited or not, for three reasons:

1. **They are someone else's photographs.** The seller or auction house owns the copyright, and an AI edit of a photo is still a copy of it. On Instagram, one rights notice removes the post and repeated notices close the account ([20](20-imagery-rights.md) §1).
2. **They show the piece before it reached us,** in someone else's light. For secondhand goods the photographs *are* the description (Consumer Rights Act, [13](13-photography-pipeline.md)), so they must show the piece as it is now.
3. **It is already decided:** *"AI does not remove the need to photograph the actual object"* ([13](13-photography-pipeline.md), [D10](../0-plan/DECISIONS.md)).

The fast route below keeps the AI editing. It just starts from our own phone photo instead.

## The workflow

**Stage 0 · Source photos (before the piece arrives).**
- Save the auction or shop listing for each piece we buy: its photos, text, lot number, seller, date and price. This is the **acquisition record**, our defence on the use of brand names ([04](../1-shop/04-site-ia.md)), and the mitigation if the payment processor reviews the account ([#30](../0-plan/99-open-questions.md)).
- Use it to decide whether to buy and to start the listing text.
- It is never published.

**Stage 1 · Intake (on arrival).**
- Give the piece an ID: `HK-0001`, `HK-0002`, and so on.
- Record its measurements in mm and its weight, and what the mark says and where it is. [Thread 3](../3-copy/README.md) has the era marks.
- Give it a provisional grade, I–IV ([#21](../0-plan/99-open-questions.md)).
- Compare it with the source photos. Anything that differs is condition.

**Stage 2 · Capture.**
- Shoot all four frames in daylight with the same setup every time. A phone is fine: consistency beats kit ([08](../brand/08-brand.md)).
- Shoot frame 3 flat as well, for AI on-model generation.
- Keep the originals at full resolution.

**Stage 3 · Evidence (frames 2 and 4).** Crop, straighten and adjust exposure only. Then stop: no AI, no grain.

**Stage 4 · AI editing (frames 1 and 3).**
- Clean up or replace the background onto the paper ground.
- Correct the colour so it matches the piece in your hand.
- Rebuild a shadow if the day was grey.
- Generate the on-model scale shot, labelled and with the size in mm.
- For Instagram mood pieces, use a generated backdrop from [prompts](prompts.md) composited per [20](20-imagery-rights.md).
- The tool is still undecided ([#37](../0-plan/99-open-questions.md)): try Photta, Photoroom, Claid, Pebblely and Flair on real stock. **Reject any output that makes stones look like plastic.**

**Stage 5 · Check.** Put each edited frame beside the real piece. Does any frame make it look better than it is? If so, redo it.

**Stage 6 · Export.**

| For | Format |
|---|---|
| Shopify | All four frames, long edge 2048px |
| Instagram | 4:5 at 1080 × 1350. Frame 4 never goes on the grid ([05](../5-social/05-social.md)) |
| 小红书 (Xiaohongshu) | 3:4. The cover has a plain type band, never text over the photograph ([05](../5-social/05-social.md)) |

Name files `HK-0001_1-composed.jpg`, `HK-0001_2-mark.jpg`, and so on.

**Stage 7 · Storage.**
- Keep one private Drive folder per piece: `source/`, `raw/`, `edit/`, `export/` and the acquisition record.
- **Not in this repo.** The repo is public, and photos are large.

## Open

- **What "photo store" means** in the brief for this thread: a shop's own listing photos (treat them like auction photos) or a photo studio (fine). Logged here until it's answered.
- **In-house or outsourced photography** ([#34](../0-plan/99-open-questions.md)).
- **Which AI tool** ([#37](../0-plan/99-open-questions.md)), and whether the hero frames get AI at all ([#39](../0-plan/99-open-questions.md)). The instinct is not to.
- **The published retouching policy** ([#40](../0-plan/99-open-questions.md)). The words come from [Thread 3](../3-copy/README.md).
- **Imagery questions:**
  - Public-domain checks on paintings ([#79](../0-plan/99-open-questions.md))
  - A model release before any real on-body shoot ([#81](../0-plan/99-open-questions.md))
  - A recurring generated sitter, or a new face each time? ([#83](../0-plan/99-open-questions.md))
  - The image generator's commercial-use terms ([#84](../0-plan/99-open-questions.md))

## Next

1. Answer "photo store", above.
2. Set up the Drive folder structure and the piece-ID sequence.
3. Run the whole workflow on the first five pieces. Time each stage: the plan assumes 45–60 minutes per piece ([06](../0-plan/06-unit-economics.md)).
4. Trial two AI tools on the same three pieces and pick one ([#37](../0-plan/99-open-questions.md)).

## Start a session for this thread

```
This is the Hikari photos thread (Thread 2: the photo workflow, from source
photo to AI-edited image). Read CLAUDE.md, then 2-photos/README.md and
2-photos/13-photography-pipeline.md. Tell me where the thread stands in
five lines and propose the next three actions. Don't change anything until
I pick one. Work from the latest main.
```
