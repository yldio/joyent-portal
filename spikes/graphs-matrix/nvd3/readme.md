# Epoch

 - [x] Graphs should maintain aspect ration
 - [ ] Graphs should match Antonas' first draft designs
 - [x] Should have 3 Graphs on each row
 - [x] Should be a 3 x 4 matrix of graphs, showing different data
 - [x] Graphs should not jitter, ideally smoothly move across the x axis
 - [x] All graphs should be a bar graph
 - [ ] Animations when a graph comes into view 
 
## notes

 - Epoch is not responsive. Even though they maintain aspect ratio, using a responsive grid they get cluttered between each other
 - With short update intervals, the graphs start using to much cpu and can't handle it
 - Even looking at the [documentation](https://epochjs.github.io/epoch/styles), it's not obvious how styling works and I wasn't able to make it work.
