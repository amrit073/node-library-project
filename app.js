const express = require('express')
const res = require('express/lib/response')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('./staticfiles'))
app.use(express.urlencoded({ extended: false }))


app.get('/login', (req, res) => {
    const { isbn, title, suntitle, author } = req.query
    if (!isbn) {
        return res.status(400).send('please fill the isbn field')
    }
    const getInfo = (filepath, cb) => {
        fs.readFile(filepath, 'utf8', (err, filedata) => {
            if (err) { return cb(err, null) } else {
                parsed_filedata = JSON.parse(filedata).books
                got_data = null
                try {
                    got_data = parsed_filedata.find((item) => item.isbn === isbn)
                    return cb(null, got_data)
                } catch (err) {
                    return cb(err, null)
                }


            }
        })
    }


    cb = (err, data) => {
        if (err) {
            res.json({ success: false, msg: err })
        } else if (got_data) {
            res.send(data)
        } else {
            res.send('not found in library')
        }
    }
    getInfo('./books.json', cb)
})



app.post('/login', (req, res) => {
    const { isbn, title, subtitle, author } = req.body

    if (!isbn && !title && !subtitle && !author) {
        return res.status(400).json({ success: false, data: 'plz provide full info' })
    }
    to_feed = {
        "isbn": isbn,
        "title": title,
        "subtitle": subtitle,
        "author": author
    }
    const getFile = (filePath, getfunc) => {
        fs.readFile(filePath, 'utf8', (err, file) => {
            if (err) {
                return getFunc(err, null)
            } else {
                file = JSON.parse(file)
                console.log('pushing');
                checkFile = null
                checkFile = file.books.find((item) => item.isbn === isbn)
                if (checkFile) {
                    return getfunc(null, `book already exist as <br> ${JSON.stringify(checkFile)}`)
                } else {
                    file.books.push(to_feed)
                    fs.writeFileSync(filePath, JSON.stringify(file, null, 2))
                    return getFunc(null, file)
                }
            }
        })
    }

    getFunc = (err, file) => {
        if (err) { res.send(err); }
        else { res.send(file); }
    }

    getFile('./books.json', getFunc)



})

app.put('/login', (req, res) => {
    const { isbn, title, subtitle, author } = req.body


    if (!(isbn && title && subtitle && author)) {
        res.status(400).send('provide all data ')
    }
    console.log(isbn);
    const getInfo = (filepath, cb) => {
        fs.readFile(filepath, 'utf8', (err, filedata) => {
            if (err) { return cb(err, null) }
            else {
                fs.readFile('./books.json', 'utf8', (err, data) => {
                    if (err) { console.log(err); } else {
                        parsed_data = JSON.parse(data)
                        got_data = parsed_data.books.find((item) => item.isbn === isbn)
                        console.log(got_data);
                        index = parsed_data.books.indexOf(got_data)
                        console.log(index);
                        parsed_data.books[index].title = title
                        console.log('hehehehehehehhehehe');
                        parsed_data.books[index].subtitle = subtitle
                        parsed_data.books[index].author = author
                        fs.writeFile(filepath, JSON.stringify(parsed_data, null, 2), (err) => {
                            if (err) { return cb(err, null) }
                            else { return cb(null, parsed_data) }
                        })
                    }

                })
            }
        }
        )
    }
    cb = (err, data) => {
        if (err) {
            return res.json({ success: false, msg: err })
        } else {
            return res.send(data)
        }

    }
    getInfo('./books.json', cb)

})

app.delete('/login', (req, res) => {
    const { isbn, title, subtitle, author } = req.body
    if (!isbn) {
        res.status(400).send('provide ispn ')
    }
    
    const getInfo = (filepath, cb) => {
        fs.readFile(filepath, 'utf8', (err, filedata) => {
            if (err) { return cb(err, null) }
            else {
                fs.readFile('./books.json', 'utf8', (err, data) => {
                    if (err) { console.log(err); } else {
                        parsed_data = JSON.parse(data)
                        got_data = parsed_data.books.find((item) => item.isbn === isbn)
                        if(got_data){
                        index = parsed_data.books.indexOf(got_data)
                        console.log(index);
                        parsed_data.books.splice(index,1)
                        fs.writeFile(filepath, JSON.stringify(parsed_data, null, 2), (err) => {
                            if (err) { return cb(err, null) }
                            else { return cb(null, parsed_data) }
                        })}else{return cb(null, 'not in file')}
                    }

                })
            }
        }
        )
    }
    cb = (err, data) => {
        if (err) {
            return res.json({ success: false, msg: err })
        } else {
            return res.send(data)
        }
    }
    getInfo('./books.json', cb)
})

    

app.listen(5000, () => { console.log('server started at port 5000'); })
