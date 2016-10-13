using System;
using System.Text;
using System.Security.Cryptography;

namespace HashAlgorithm
{
    class Program
    {
        static void Main(string[] args)
        {
            var appKey = "121af1areredsf";
            var datetime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss+00:00");//2016-10-09T08:50:24+00:00
            var salt = "fafdsafaf";

            var originalMessage = string.Format("{0}&{1}&{2}", appKey, datetime, salt);

            Console.WriteLine("Secure Hash Demonstration in .NET");

            Console.WriteLine("---------------------------------");
            Console.WriteLine("Original Message 1 : " + originalMessage);
            Console.WriteLine();

            var base64Str = HashData.Base64StrFromSHA1(originalMessage);

            Console.WriteLine();
            Console.WriteLine("Message 1 SHA 1 Hashes = " + base64Str);
            
            Console.ReadLine();
        }
    }

    public class HashData
    {
        public static byte[] ComputeHashSHA1(byte[] toBeHashed)
        {
            using (var sha1 = SHA1.Create())
            {
                return sha1.ComputeHash(toBeHashed);
            }
        }

        public static byte[] ComputeHashSHA256(byte[] toBeHashed)
        {
            using (var sha256 = SHA256.Create())
            {
                return sha256.ComputeHash(toBeHashed);
            }
        }

        public static byte[] ComputeHashSHA512(byte[] toBeHashed)
        {
            using (var sha512 = SHA512.Create())
            {
                return sha512.ComputeHash(toBeHashed);
            }
        }

        public static string Base64StrFromSHA1(string s) {
            
            var sha1hashedMessage = HashData.ComputeHashSHA1(Encoding.UTF8.GetBytes(s));
            var base64Str = Convert.ToBase64String(sha1hashedMessage);

            return base64Str;
        }
    }
}
