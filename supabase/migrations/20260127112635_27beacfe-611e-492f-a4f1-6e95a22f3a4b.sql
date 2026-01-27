-- Tighten overly-permissive INSERT policy for contact_messages (still allows public submit)
DROP POLICY IF EXISTS "Anyone can submit contact message" ON public.contact_messages;
CREATE POLICY "Anyone can submit contact message"
ON public.contact_messages
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(email)) BETWEEN 3 AND 255
  AND position('@' in email) > 1
  AND length(trim(message)) BETWEEN 1 AND 5000
);
