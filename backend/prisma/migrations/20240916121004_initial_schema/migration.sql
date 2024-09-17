-- CreateTable
CREATE TABLE "User" (
    "serial_id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("unique_id")
);

-- CreateTable
CREATE TABLE "Post" (
    "serial_id" SERIAL NOT NULL,
    "unique_id" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("unique_id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("unique_id") ON DELETE RESTRICT ON UPDATE CASCADE;
