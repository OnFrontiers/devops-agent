# Our Team's Story Pointing Guidelines

**Last Updated:** June 1, 2025

## 🎯 Goal of Story Pointing

The primary goals of our story pointing process are:

1. To achieve a **shared understanding** among the team about the relative effort, complexity, and uncertainty involved in completing a work item (user story, feature, or task).
2. To help identify work items that are **too large** and need to be broken down into smaller, more manageable pieces to improve flow.
3. To provide a basis for **long-term forecasting** by understanding our team's historical cycle time per point, *not* to provide precise upfront time estimates for individual items.

## 🔢 Our Pointing System: Modified Fibonacci

We use the following sequence for story points:

**1, 2, 3, 5, 8**

- Items larger than an **8** are typically too large and should be broken down before pointing the smaller pieces.

## ⚓️ Establishing & Using Baseline (Anchor) Stories

To ensure consistency in our relative sizing, we use baseline stories.

1. **Initial Setup (One-Time):**
    - As a team, we selected 2-3 well-understood work items that were already completed or very clearly defined.
    - We assigned:
        - **2 points** to a story representing a small, straightforward piece of work (our primary anchor).
        - **1 point** to a story representing a trivial task (if applicable).
        - **3 points** to a story noticeably more complex/effortful as our "2-point" anchor
        - And so on, for **5 or 8 pt stories**
2. **Ongoing Use:**
    - All new stories are pointed *relative* to these established anchor stories.
    - Constantly ask: "Is this new story smaller than, similar to, or larger than our '2-point' anchor?"

## 🤔 How to Individually Assess Points

Before or during our team pointing session, each team member involved in the work should silently consider:

1. **Understand the Story:**
    - What is the user need or business value?
    - What are the acceptance criteria (Definition of Done for this item)?
    - Ask clarifying questions if anything is unclear.
2. **Compare to Baselines:**
    - How does this story compare in overall effort and complexity to our established anchor stories (especially our "2-point" story)?
3. **Consider Key Factors (The "3 Cs"):**
    - **Complexity:** How intricate is the work? Are there many interdependencies, new patterns, or difficult logic?
    - **Effort:** How much work is involved across all disciplines (e.g., design, coding, testing, deployment preparation)?
    - **Uncertainty/Risk:** How much is unknown? Are there new technologies, unclear external factors, or potential for significant rework? Higher uncertainty might lean towards a slightly higher point value.
4. **Think Relatively, Not in Time:**
    - Avoid translating points directly into hours or days during the estimation itself. Focus on the relative size compared to other stories.
5. **Select Your Point Value:**
    - Based on the above, choose a point value from our agreed scale (1, 2, 3, 5, 8).

## 🤝 Our Team Pointing Process

We aim for a lean and fast pointing session, typically as stories are being considered for the "Dev Ready" state.

**Method: Simplified Planning Poker / Quick Consensus**

1. **Story Introduction (2-3 mins):**
    - The Product Owner (or requestor) briefly explains the story and its goal.
    - Team members ask clarifying questions focused on understanding the scope and requirements.
2. **Individual Consideration & Point Selection (Silent):**
    - Each team member privately determines their point assessment based on the guidelines above.
3. **Simultaneous Reveal (Optional but Recommended):**
    - Everyone shows their chosen point value at the same time (e.g., using fingers, sticky notes, or a simple online tool). This helps avoid anchoring bias.
    - *If not doing simultaneous reveal, the facilitator can ask for initial thoughts.*
4. **Discuss & Converge:**
    - **Agreement:** If all points are the same or very close (e.g., all 3s, or a mix of 2s and 3s), quickly confirm the majority or average and assign that value.
    - **Divergence:** If there's a significant difference (e.g., a 2 and an 8):
        - The team members with the highest and lowest estimates briefly (1-2 minutes each) explain their reasoning. This is crucial for uncovering different assumptions, knowledge gaps, or potential complexities.
        - The discussion should focus on *why* the estimates differ, not on defending a number.
5. **Re-Point (If Necessary):**
    - After the discussion, if initial points were divergent, the team quickly re-points. Estimates usually converge.
6. **Decision & Recording:**
    - Once consensus (or "good enough" agreement) is reached, the agreed-upon point value is recorded on the story card/digital item.
    - **If a story consistently receives high points (e.g., 8) or if there's persistent wide disagreement, it's a strong signal to break the story down into smaller, more clearly defined pieces.** These smaller pieces will then be pointed individually.

## ✨ Key Considerations & Best Practices

- **Frequency:** Point stories just-in-time, typically during backlog refinement, Monday meetings, or in stand-ups as they approach being ready to be pulled into development. Short, regular sessions (e.g., 15-30 mins, 1-2 times a week) are better than long, infrequent ones.
- **"Dev Ready" Work Only:** Only point stories that are clearly defined and understood by the team. If a story is too vague, it needs further refinement, not pointing.
- **Breaking Down Stories:** Stories estimated at **8 points** (or consistently generating debate around high numbers) should almost always be broken down further. Smaller stories flow better.
- **Bugs:**
    - We won't point minor bug fixes. Focus on fixing them quickly.
    - If a bug is significant and requires substantial effort (akin to a small feature), it may be converted into a story and pointed.
- **No Partial Points:** Points are awarded when the story fully meets its Definition of Done.
- **Team Estimate:** The final point value is a team consensus. It represents the collective effort, not an individual's commitment.
- **Points are Relative to OUR Team:** Story points are specific to our team's context and baselines. They should not be directly compared to other teams' points.
- **Iterate & Adapt:** This process is a starting point. We will periodically review (e.g., in retrospectives) how well it's working and make adjustments as needed.

## 📈 How We Use Points Over Time

While points are not direct time estimates, they help us:

1. **Understand Relative Size:** Immediately grasp the perceived effort of stories relative to each other.
2. **Improve Predictability (Long-Term):** By tracking our historical **Cycle Time per point** (or per story size category), we can develop more reliable forecasts for larger batches of work. For example, "Historically, 3-point stories take us, on average, X-Y days to complete."

---

This document can be shared with your team in Notion, and you can iterate on it as your process evolves!