# react-infinite

 - not fetching when scrolling to the end of a big list
 - it's keeping the location when we filter (kinda)
 - tried with 100000 rows and it scrolled flawlessly, but it struggled filtering (I assume that the filter itself it the reason)
 - because the calculations are based on a fixed container height, we might need to figure out how to handle a responsive ui where the height changes
 - I notice that instead of recycling rows progressively, it does it in batches