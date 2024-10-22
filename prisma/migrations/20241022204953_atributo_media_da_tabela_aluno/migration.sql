/*
  Warnings:

  - Added the required column `media` to the `alunos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "alunos" ADD COLUMN     "media" DOUBLE PRECISION NOT NULL;
