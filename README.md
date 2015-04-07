# standard-model
A standard render.js for character-viewer, basically a standard model on characters for those who don't want to make their own.

Character Profiles are to be made as an array of JSON objects in the following format:
(When implementing, omit any comments and [] statements.)
<pre><code>
REQUIRED: If implemented, this field needs to exist.
Optional: If implemented, this field can be omitted entirely.
Defined: If not implemented, this field will still render/still exist, but be
replaced with 'undefined'.
RESERVED: Values that are implemented specially on the render, e.g. "inches" for height
becomes [feet]'[inches]".
JSON does not support line breaks in strings. Replace any line breaks with \n
[
{
    [REQUIRED]
    [NOTE: Does not have to be unique]
    "name": string,
    [Can be left blank]
    "icon": "[path/to/file]",
    // Used for thematic coloring when selected.
    // Be sure to use one that is visable.
    "color": "#[hex]",
    
    [Defined]
    "age": number,
    "species": string,
    "gender": string,
    
    [Optional]
    "height": [
        {
            [REQUIRED]
            "unit": string,
            // An abbreviation form of the unit.
            "abbrev": string,
            "value": number,
            
            // Proportional, when a character is smaller/larger than a standard range.
            [Optional]
            "prop": number
        },
        
        [RESERVED]
        {
            "unit": "inches",
            "abbrev": "in",
            "value": number,
            "prop": number
        },
        {
            "unit": "centimeters",
            "abbrev": "cm",
            "value": number,
            "prop": number
        }
    ],
    "weight": [
        {
            [REQUIRED]
            "unit": string,
            // An abbreviation form of the unit.
            "abbrev": string,
            "value": number,
            
            // Proportional, when a character is smaller/larger than a standard range.
            [Optional]
            "prop": number
        }
    ],
    
    [REQUIRED]
    "images": [
        [May not contain any items]
        {
            [REQUIRED]
            "icon": "[path/to/file]",
            "full": "[path/to/file]"
        }
    ],
    
    [Optional]
    "history": "[PARAGRAPH]\n\[PARAGRAPH]",
    "appearance": "[PARAGRAPH]\n\[PARAGRAPH]",
    "personality": "[PARAGRAPH]\n\[PARAGRAPH]"
},
...
}
</code></pre>

## Raw:
<pre><code>
[
{
    "name": "",
    "icon": "path/to/file",
    "color": "#000000",
    
    "age": number,
    "species": "",
    "gender": "",
    
    "height": [
        {
            "unit": "inches",
            "abbrev": string,
            "value": 0,
            "prop": 0
        },
        {
            "unit": "centimeters",
            "abbrev": "cm",
            "value": 0,
            "prop": 9
        }
    ],
    "images": [
        {
            "icon": "path/to/file",
            "full": "path/to/file"
        }
    ],
    
    "history": "",
    "appearance": "",
    "personality": ""
}
]
</code></pre>

## Mininum:
<pre><code>
[
{
    "name": "",
    "icon": "path/to/file",
    "color": "#000000",
    
    "images": [
        {
            "icon": "path/to/file",
            "full": "path/to/file"
        }
    ]
}
]
</code></pre>
