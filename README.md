# TomatoTester
A Repo to test Divs position

With TomatoTester you can test div positions easily,
it works by changing each tags to random colors 

# Run 
for run, you just need to pass the cdn script tag into your project 
```html
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/TomatoTester@main/versions/tomato_testter1.js"></script>
```

# Full example

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tomato Test</title>
    <script src="https://cdn.jsdelivr.net/gh/OUIsolutions/TomatoTester@main/versions/tomato_testter1.js"></script>
    <script>tomato_start()</script>
    <style>
        .container{
            width: 70vw;
            height: 70vh;
        }
        .child{
            width: 30%;
            height: 30%;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="child">
            <h4>child 1</h4>
        </div>
        <div class="child">

            <h4>child 2</h4>
        </div>
        <div class="child">
            <h4>child 3</h4>
        </div>
    </div>
</body>
</html>
```
