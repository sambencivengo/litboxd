## PLAN

Tech:

-   Next.js/React
-   TailwindCSS (maybe ChakraUI)
-   Redis
-   PostgreSQL
-   TypeGraphQl
-   Apollo

User:

-   username
-   password
-   reviews (Review[])

Review:

-   score (out of 5, in half increments)
-   likes (int)
-   title
-   description

# New Idea

-   for every record (Review, Reading List) save the bookWorkKey, cover_i, author, book title
    -   this will make it easier to grab data from the book api after the search call

1. User searches for a book

    - gets multiple results

2. user picks a result and either rates it on the spot or adds it to the reading list

    - regardless of decision, we will store the above info so that the only calls to the openlibrary api will be for cover images and initial search results.
    - this should help with stronger typing across the app:
        - books will then have (at least): bookTitle, cover image, author, workKey. Possible description but that seems to often be missing in the API
